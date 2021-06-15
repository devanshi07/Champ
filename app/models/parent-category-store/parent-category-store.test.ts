import { ParentCategoryStoreModel, ParentCategoryStore } from "./parent-category-store"

test("can be created", () => {
  const instance: ParentCategoryStore = ParentCategoryStoreModel.create({})

  expect(instance).toBeTruthy()
})