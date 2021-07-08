import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";
import { SubCategoryDetailsModel } from "../sub-category-details/sub-category-details";

/**
 * Model description here for TypeScript hints.
 */
export const SubCategoryStoreModel = types
  .model("SubCategoryStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    currentSubcategoryId: types.optional(types.number, 0),
    subCategoryDetails: types.optional(types.array(types.frozen()), []),
    visitedSubcategorydata: types.optional(types.array(types.frozen()), []),
    visitedCategoryId : types.optional(types.array(types.frozen()),[]),
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setCurrentSubCategoryId(id) {
      self.currentSubcategoryId = id
      console.tron.log("current...",self.currentSubcategoryId)
    },
    getSubCategoryData: flow(function* getSubCategoryData(parentId: number) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getParentCategory(parentId);
        if (res.kind === "ok" && res.status == 200) {
          let index = self.subCategoryDetails.findIndex(x => x.parentId == parentId)
          if (index == -1) {
            self.isLoading = false;
            self.subCategoryDetails.push({ parentId: parentId, data: res.parentCategory.data })
          }
          else {
            self.isLoading = false;
            self.subCategoryDetails[parentId] == { parentId: parentId, data: res.parentCategory.data }
          }
          return { response: true, message: "Success." };
        }
        else {
          self.isLoading = false;
          return { response: false, message: "Something went wrong." };
        }
      } catch (error) {
        self.isLoading = false;
        console.log("parent error ", error)
        return { response: false, message: "Something went wrong." };
      }
    }),

    visitedSubcategory(parentId, parentName, categoryId, categoryName, item) {
      if (self.visitedSubcategorydata.length != 0) {
        let index1 = self.visitedSubcategorydata.findIndex(x => x.parentId == parentId && x.categoryId == categoryId)
        if (index1 == -1) {
          self.visitedSubcategorydata.push({ parentId: parentId, parentName: parentName, categoryId: categoryId, categoryName: categoryName, media: item })
        }
        else {
          self.visitedSubcategorydata[index1] == { parentId: parentId, parentName: parentName, categoryId: categoryId, categoryName: categoryName, media: item }
        }
      } else {
        self.visitedSubcategorydata.push({ parentId: parentId, parentName: parentName, categoryId: categoryId, categoryName: categoryName, media: item })
      }
    },
    deletevisitedsubcategory(categoryId, mediaId, text) {
      let index1 = self.visitedSubcategorydata.findIndex(x => x.categoryId == categoryId)
      let categoryData = self.visitedSubcategorydata.find(x => x.categoryId == categoryId)
      let length = categoryData.media.length
      if (length > 1) {
        let mediaData = categoryData.media.findIndex(x => x.id == mediaId)
        const copyData = [...self.visitedSubcategorydata[index1].media]
        copyData.splice(mediaData, 1)
        self.visitedSubcategorydata[index1] = { parentId: categoryData.parentId, parentName: text, categoryId: categoryId, categoryName: categoryData.categoryName, media: copyData }
      } else {
        self.visitedSubcategorydata.splice(index1, 1)
      }
    },
    updateMediaList(parentId, parentName, categoryId, categoryName, item) {
      let index1 = self.visitedSubcategorydata.findIndex(x => x.categoryId == categoryId)
      const copyData = [...self.visitedSubcategorydata[index1].media]
      copyData.push(item)
      self.visitedSubcategorydata[index1] = { parentId: parentId, parentName: parentName, categoryId: categoryId, categoryName: categoryName, media: copyData }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type SubCategoryStoreType = Instance<typeof SubCategoryStoreModel>
export interface SubCategoryStore extends SubCategoryStoreType { }
type SubCategoryStoreSnapshotType = SnapshotOut<typeof SubCategoryStoreModel>
export interface SubCategoryStoreSnapshot extends SubCategoryStoreSnapshotType { }
