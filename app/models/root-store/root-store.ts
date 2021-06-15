import { ParentCategoryStoreModel } from "../parent-category-store/parent-category-store"
import { AuthStoreModel } from "../auth-store/auth-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  parentCategoryStore: types.optional(ParentCategoryStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
