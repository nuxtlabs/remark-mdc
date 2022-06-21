# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.1](https://github.com/docusgen/remark-mdc/compare/v0.1.0...v0.1.1) (2022-06-21)


### Bug Fixes

* add `jiti` dev dependency ([420ea22](https://github.com/docusgen/remark-mdc/commit/420ea2294ac2197ccebbdeef914c36e5760fa4a9))
* **block-container:** consume codes after attempts ([#40](https://github.com/docusgen/remark-mdc/issues/40)) ([1f2ee9b](https://github.com/docusgen/remark-mdc/commit/1f2ee9b7a215d48779704f07ca0f51c0b1d02a80))
* **build:** generate cjs file ([d82e60e](https://github.com/docusgen/remark-mdc/commit/d82e60e1cd357b833ad62d49d4330d290b1f7df0))
* **frontmatter:** remove line width limit ([3108772](https://github.com/docusgen/remark-mdc/commit/3108772b34385ecbcd86c74169cc808493425965))
* **gray-matter:** fix gray-matter imports ([#33](https://github.com/docusgen/remark-mdc/issues/33)) ([435a62a](https://github.com/docusgen/remark-mdc/commit/435a62aa041e6d34c8f02bd9ae331c4cdf18da88))
* **inline:** do not detect inline components as block ([325e75e](https://github.com/docusgen/remark-mdc/commit/325e75e169a5717c7a3828bccd9dca47be042458)), closes [#44](https://github.com/docusgen/remark-mdc/issues/44)
* **span:** conflict span syntax with gfm task list ([#43](https://github.com/docusgen/remark-mdc/issues/43)) ([629710c](https://github.com/docusgen/remark-mdc/commit/629710c9a6cb261ea22a0e4120ec9f702f7e7b7e))
* **span:** respect reference-style link ([44289c2](https://github.com/docusgen/remark-mdc/commit/44289c27c849f25c64e071f7614b853a835e8925))
* update release scripts ([5082fc7](https://github.com/docusgen/remark-mdc/commit/5082fc77f1206779e13c994f0fb8b73aea1b83d4))

## 0.1.0 (2021-11-24)


### Features

* provide `fmAttributes` and use it to generate markdown ([ce3702e](https://github.com/docusgen/remark-mdc/commit/ce3702ee456ebb39d1b24494e34df2adb545a46d))


### Bug Fixes

* add indexStack to toMarkdown context ([#16](https://github.com/docusgen/remark-mdc/issues/16)) ([1814036](https://github.com/docusgen/remark-mdc/commit/1814036e650b97f9d6e704bfd77347d757645eb3))
* bounded props must have value ([#27](https://github.com/docusgen/remark-mdc/issues/27)) ([996dc7b](https://github.com/docusgen/remark-mdc/commit/996dc7bb56b10e4f1c66be941b052ff708f5aef2))
* convert attributes to kebab-case ([a9467e3](https://github.com/docusgen/remark-mdc/commit/a9467e301fc2e88509582399144a967d6600b8f1))
* **fromMarkdown:** ignore bind attributes without value ([#25](https://github.com/docusgen/remark-mdc/issues/25)) ([4b236d7](https://github.com/docusgen/remark-mdc/commit/4b236d748ecd4442cddcb20f5b400c97a210e0f5))
* lint ([9d0b4ce](https://github.com/docusgen/remark-mdc/commit/9d0b4ce4ba99f0b6a34594f5772137a2b1a5b275))
* mufm@1.1.0 `tokenStack` holds list of arrays ([091387a](https://github.com/docusgen/remark-mdc/commit/091387ab005f4878a9006a04cc30d2bfd3ed10f4)), closes [#32](https://github.com/docusgen/remark-mdc/issues/32)
* plugin definition ([99523cd](https://github.com/docusgen/remark-mdc/commit/99523cdabc7792aed5376aa2154dd1bf84ef0087))
* plugin options ([a183825](https://github.com/docusgen/remark-mdc/commit/a18382588becb3e7800385cb9b2c98969b037e53))
* plugin type ([6582c17](https://github.com/docusgen/remark-mdc/commit/6582c17433f63b12c084cbf0c7d6149f5c496b31))
* prevent `undefiend` error on document beginning ([3abdbed](https://github.com/docusgen/remark-mdc/commit/3abdbed29e33fc8ad4adcb0209a4f224da8995f7))
* remove redundant newline ([efe2c99](https://github.com/docusgen/remark-mdc/commit/efe2c9987abd81bc28b3c07841bb993f71c194a0))
* **toMarkdown:** fix context stack ([#22](https://github.com/docusgen/remark-mdc/issues/22)) ([3385d22](https://github.com/docusgen/remark-mdc/commit/3385d221a213289c4ae98330e92a53698ce179f3))
* **toMarkdown:** fix empty string & boolean props ([#24](https://github.com/docusgen/remark-mdc/issues/24)) ([cc4de9f](https://github.com/docusgen/remark-mdc/commit/cc4de9f4b799db0398a1282a836345417284e4f4))
* **toMarkdown:** handle component section and data ([#18](https://github.com/docusgen/remark-mdc/issues/18)) ([d855779](https://github.com/docusgen/remark-mdc/commit/d855779bae50ecf7318f2971fce526f0f85920f6))
* use synchronous transformer when no components ([#15](https://github.com/docusgen/remark-mdc/issues/15)) ([1ce6cfa](https://github.com/docusgen/remark-mdc/commit/1ce6cfa5437c714f711e88dc5150e1524246871e))

## 0.1.0 (2021-11-24)


### Features

* provide `fmAttributes` and use it to generate markdown ([ce3702e](https://github.com/docusgen/remark-mdc/commit/ce3702ee456ebb39d1b24494e34df2adb545a46d))


### Bug Fixes

* add indexStack to toMarkdown context ([#16](https://github.com/docusgen/remark-mdc/issues/16)) ([1814036](https://github.com/docusgen/remark-mdc/commit/1814036e650b97f9d6e704bfd77347d757645eb3))
* bounded props must have value ([#27](https://github.com/docusgen/remark-mdc/issues/27)) ([996dc7b](https://github.com/docusgen/remark-mdc/commit/996dc7bb56b10e4f1c66be941b052ff708f5aef2))
* convert attributes to kebab-case ([a9467e3](https://github.com/docusgen/remark-mdc/commit/a9467e301fc2e88509582399144a967d6600b8f1))
* **fromMarkdown:** ignore bind attributes without value ([#25](https://github.com/docusgen/remark-mdc/issues/25)) ([4b236d7](https://github.com/docusgen/remark-mdc/commit/4b236d748ecd4442cddcb20f5b400c97a210e0f5))
* lint ([9d0b4ce](https://github.com/docusgen/remark-mdc/commit/9d0b4ce4ba99f0b6a34594f5772137a2b1a5b275))
* mufm@1.1.0 `tokenStack` holds list of arrays ([091387a](https://github.com/docusgen/remark-mdc/commit/091387ab005f4878a9006a04cc30d2bfd3ed10f4)), closes [#32](https://github.com/docusgen/remark-mdc/issues/32)
* plugin definition ([99523cd](https://github.com/docusgen/remark-mdc/commit/99523cdabc7792aed5376aa2154dd1bf84ef0087))
* plugin options ([a183825](https://github.com/docusgen/remark-mdc/commit/a18382588becb3e7800385cb9b2c98969b037e53))
* plugin type ([6582c17](https://github.com/docusgen/remark-mdc/commit/6582c17433f63b12c084cbf0c7d6149f5c496b31))
* prevent `undefiend` error on document beginning ([3abdbed](https://github.com/docusgen/remark-mdc/commit/3abdbed29e33fc8ad4adcb0209a4f224da8995f7))
* remove redundant newline ([efe2c99](https://github.com/docusgen/remark-mdc/commit/efe2c9987abd81bc28b3c07841bb993f71c194a0))
* **toMarkdown:** fix context stack ([#22](https://github.com/docusgen/remark-mdc/issues/22)) ([3385d22](https://github.com/docusgen/remark-mdc/commit/3385d221a213289c4ae98330e92a53698ce179f3))
* **toMarkdown:** fix empty string & boolean props ([#24](https://github.com/docusgen/remark-mdc/issues/24)) ([cc4de9f](https://github.com/docusgen/remark-mdc/commit/cc4de9f4b799db0398a1282a836345417284e4f4))
* **toMarkdown:** handle component section and data ([#18](https://github.com/docusgen/remark-mdc/issues/18)) ([d855779](https://github.com/docusgen/remark-mdc/commit/d855779bae50ecf7318f2971fce526f0f85920f6))
* use synchronous transformer when no components ([#15](https://github.com/docusgen/remark-mdc/issues/15)) ([1ce6cfa](https://github.com/docusgen/remark-mdc/commit/1ce6cfa5437c714f711e88dc5150e1524246871e))
