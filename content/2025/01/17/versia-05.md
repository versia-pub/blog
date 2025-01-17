---
title: Versia 0.5 is here!
created_at: 1737126070000
description: The latest and greatest version of Versia is here! This release is all about small changes and tweaks to make exchanges more consistent.
image: /images/vibrant-abstract-purple-pink.jpg
image_credit: Steve Johnson, Pexels
image_width: 1280
image_height: 720
author: CPlusPatch
author_image: https://cpluspatch.com/images/avatars/jessew.png
author_handle: @jessew
---

Today, on January 17th 2025, I [merged](https://github.com/versia-pub/docs/pull/35) Versia 0.5 into the docs' `main` branch.

This release doesn't bring any major changes, being mostly renames and tweaks to make data exchanges more consistent. The most notable changes are:

- Signature headers have been renamed
- The nonce in signatures has been replaced by a timestamp
- Groups are better documented
    - (and moved to an extension :p)
- [Versia Links](https://versia.pub/links) are a new feature
- Some [`Collections`](https://versia.pub/structures/collection) have been swapped for the simpler [`URICollection`](https://versia.pub/structures/collection#uri-collection) format
- A bunch of new extensions

You can find the full changelog [here](https://versia.pub/changelog).

Let's go over everything in more detail.

## Line endings

For the sake of consistency across OSes and editors, all text fields in Versia now use Unix line endings (`\n`). Most servers already use Unix line endings, but it's good to be explicit about it.

## Renamed headers

The following headers have been renamed:

- `X-Signature` --> `Versia-Signature`
- `X-Signed-By` --> `Versia-Signed-By`

Why? Well, [RFC 6648](https://tools.ietf.org/html/rfc6648) happened (tldr: the `X-` prefix is deprecated).

## Nonce no more

The `X-Nonce` header in signatures has been replaced by a timestamp. Replay attacks are not really a big concern in the Versia security model, but verifying signature freshness is still a good idea.

### What does this prevent?

Here's an example: Alice accidentally posts her full social security number to a public Versia server. Obviously, she immediately deletes the post, but someone with a malicious instance could replay the note federation request to other servers, essentially bringing it back from the dead.

This is a very contrived example, but it's a good illustration of why we should verify the freshness of signatures.

## Rate limiting

Obeying IETF draft [polli-ratelimit-headers-02](https://www.ietf.org/archive/id/draft-polli-ratelimit-headers-02.html) is now mandatory for all Versia implementations. Implementations running on weaker hardware can sometimes struggle with the load of a large number of requests, so it's important to have a way to throttle federation!

As to the draft itself, it was chosen for its simplicity, so you shouldn't have too much trouble implementing it.

## Groups

Turns out, [`Groups`](https://versia.pub/extensions/groups) were missing a lot of significant information, like how to actually subscribe and receive updates from them. This has been fixed.

The new system introduces a very similar system to the one used for [`Follows`](https://versia.pub/entities/follow), with the following new entities:

- `pub.versia:groups/Subscribe`
- `pub.versia:groups/Unsubscribe`
- `pub.versia:groups/SubscribeAccept`
- `pub.versia:groups/SubscribeReject`

As to federation, the [`Groups`](https://versia.pub/extensions/groups)'s home instance can now federate all notes posted to it while keeping the original author's signature, using the new `pub.versia:groups/Federate` entity. This avoids the need for forwardable signatures, which are a pain to implement.

To top that all off, `Groups` have [been moved to an extension](https://versia.pub/extensions/groups), because they were getting too big for the main spec.

## Versia Links

A common problem on ActivityPub is that you can easily link to a user or a note via its URI, but to interact with it, you need to have your implementation look up that URI in your favourite client. This is a pain. There should be a way to automatically open your favorite client when you click on a link, right?

Well, the issue comes from the fact that there's no way for a client to tell which URIs are Versia URIs (e.g., `https://versia.social/users/jessew`) and which are not (like `https://google.com`). This is where Versia Links come in.

They look like this:

```plaintext
# Opens a user profile
web+versia://users/bob.social/alice

# Opens a note
web+versia://notes/jimbob.com/01902e09-0f8b-72de-8ee3-9afc0cf5eae1

# Opens the composer with a reply to a note
web+versia://reply/bob.social/01902e09-0f8b-72de-8ee3-9afc0cf5eae1
```

The `web+` prefix allows Web clients to register support for the `web+versia` scheme, which will open the link in the user's Versia client. This is a simple way to make Versia URIs stand out from the rest.

Versia Links are meant to be used in instances' web UIs, for logged-out users. This replaces the "type your instance's domain" popup that was previously used in [Mastodon](https://joinmastodon.org/), for example.

For more information, check out the [Versia Links spec](https://versia.pub/links).

## Timestamp change

All timestamps now use [RFC 3339](https://tools.ietf.org/html/rfc3339) instead of ISO 8601. [RFC 3339](https://tools.ietf.org/html/rfc3339) can be thought as a more restricted version of ISO 8601, which means that most implementations should already be compatible with it.

```plaintext
# ISO 8601
2025-01-17T12:00:00Z

# RFC 3339
2025-01-17T12:00:00Z

# They're the same!
# Except now you can't do this horrible thing anymore:
2025-W03-5T17:04:29/PT2M
```

[Here's a helpful visualization of the differences between the two](https://ijmacd.github.io/rfc3339-iso8601/).

### Unix timestamps?

Unix timestamps are great for machines, but they're not very human-readable. [RFC 3339](https://tools.ietf.org/html/rfc3339) is a good compromise between the two, being both human-readable and easily machine-readable.

## `$schema` in Entities

Entities can now optionally have a `$schema` field, which allows implementations to include a [JSON Schema](https://json-schema.org/) inside the entity.

This is meant for human use only, and not for either clients or servers to validate the entity. Including the implementation's JSON schema in the entity itself can be useful for debugging and documentation purposes.

## URICollection

Some `Collections` have been swapped for the simpler `URICollection` format. This is a simple list of URIs, which can be used for things like a list of followers, for example.

It is much easier to implement than the full `Collection` format, plus it's also more lightweight.

```json
{
    "author": "https://versia.social/users/018ec082-0ae1-761c-b2c5-22275a611771",
    "first": "https://versia.social/users/018ec082-0ae1-761c-b2c5-22275a611771/followers?page=1",
    "last": "https://versia.social/users/018ec082-0ae1-761c-b2c5-22275a611771/followers?page=3",
    "total": 46,
    "next": "https://versia.social/users/018ec082-0ae1-761c-b2c5-22275a611771/followers?page=2",
    "previous": null,
    "items": [
        "https://versia.social/users/f8b0d4b4-d354-4798-bbc5-c2ba8acabfe3",
        "https://social.bob.com/u/2B27E62snga763"
    ]
}
```

## Note collections

[Notes](https://versia.pub/entities/note) now have a `collections` field, which regroups `outbox`, `likes`, `replies`, etc.

```json
{
    // ...
    "collections": {
        "replies": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/replies",
        "quotes": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/quotes",
        "pub.versia:likes/Likes": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/likes",
        "pub.versia:likes/Dislikes": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/dislikes",
        "pub.versia:reactions/Reactions": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/reactions"
    }
}
```

This is a simpler structure than in Versia 0.4, where everything was its own top-level field:

```json
{
    // ...
    "replies": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/replies",
    "quotes": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/quotes",
    "extensions": {
        "pub.versia:likes": {
            "likes": "https://versia.social/objects/01902e09-0f8b-72de-8ee3-9afc0cf5eae1/likes",
        }
    }
}
```

## Interaction Controls

The new [Interaction Controls Extension](https://versia.pub/extensions/interaction-controls) allows users to control who can interact with their posts, just like on Bluesky or Twitter. This is great when you're often the target of spam or harassment.

The system has a lot of flexibility while still being simple enough to implement in a weekend or two.

## Smaller stuff

- Usernames can now have uppercase characters. Also, they're now case-insensitive, so `jessew` and `JesseW` are the same user.
- The [Vanity Extension](https://versia.pub/extensions/vanity) now supports a `timezone` field.
- Docs have been improved across the board, with [more examples](https://versia.pub/federation/example) and explanations.
- [`Reports`](https://versia.pub/extensions/reports) are now transient, and the `reason` field was replaced by a `tags` field.

## Conclusion

Is this a large breaking change that will require a lot of work to implement? No, not really. Is it better than the previous version? Yes, definitely.

I hope you have a good time implementing this release. If you have any questions, feel free to contact me, Jesse, [on these socials](https://cpluspatch.com/contact). I'm always glad to help.

Happy hacking!