import assert from "node:assert/strict";
import { validatePublishGates } from "../src/lib/content";

const base = {
  title: "Test",
  slug: "test",
  evidenceStatus: "peer_reviewed",
  primaryTopicId: "topic-1",
  heroImage: {
    id: "img-1",
    sourceUrl: "https://example.com/a.png",
    storageUrl: null,
    thumbnailUrl: null,
    altText: "alt",
    caption: null,
    creator: null,
    organization: null,
    creditLine: "NASA",
    licenseName: null,
    rightsUrl: null,
    copyrightStatus: null,
    commercialUseAllowed: true,
    modificationAllowed: true,
    publicationAllowed: true,
    verificationNotes: null,
    verifiedAt: null as Date | null,
    width: null,
    height: null,
    mediaType: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  noImageException: false,
  sourceCount: 1,
  hasReviewedContent: true,
};

assert.equal(validatePublishGates(base).length, 0);
assert.ok(
  validatePublishGates({ ...base, sourceCount: 0 }).some(
    (f) => f.code === "SOURCE_REQUIRED",
  ),
);
assert.ok(
  validatePublishGates({
    ...base,
    heroImage: { ...base.heroImage, publicationAllowed: false },
  }).some((f) => f.code === "IMAGE_RIGHTS_REQUIRED"),
);
assert.equal(
  validatePublishGates({
    ...base,
    heroImage: null,
    noImageException: true,
  }).length,
  0,
);

console.log("validatePublishGates tests passed");
