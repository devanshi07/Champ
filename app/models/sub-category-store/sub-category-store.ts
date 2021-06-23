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
    subCategoryDetails: types.optional(types.frozen(), []),
    checkSubCategory: types.optional(types.array(SubCategoryDetailsModel), []),

    maxChildId: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getSubCategoryData: flow(function* getSubCategoryData(parentId: number) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getParentCategory(parentId);
        if (res.kind === "ok" && res.status == 200) {
          self.isLoading = false;

          self.subCategoryDetails = res.parentCategory.data
         // self.checkSubCategory.push(self.subCategoryDetails)
          console.tron.log(self.subCategoryDetails)
        
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
    
    setMaxChildId(id) {
      self.maxChildId = id
    },

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
