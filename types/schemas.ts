import { defineImage, defineOrganization } from "#imports";

export const logo = defineImage({
    "@id": "https://versia.pub/#logo",
    url: "https://cdn.versia.pub/branding/png/icon.png",
    width: 1024,
    height: 1024,
    caption: "A couple of white stars on a pink rounded square.",
});

export const org = defineOrganization({
    name: "Versia",
    logo: logo["@id"],
    url: "https://versia.pub",
    sameAs: [],
});
