import { StructureBuilder } from 'sanity/structure';

export default (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Feed Posts')
        .child(S.documentTypeList('feedPost').title('Feed Posts')),
      S.listItem()
        .title('Studio Projects')
        .child(S.documentTypeList('studioProject').title('Studio Projects')),
      S.listItem()
        .title('Products')
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Pages')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Ad Banners')
        .child(S.documentTypeList('adBanner').title('Ad Banners')),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'feedPost', 'studioProject', 'product', 'page', 'category', 'adBanner'].includes(
            listItem.getId() || ''
          )
      ),
    ]);

