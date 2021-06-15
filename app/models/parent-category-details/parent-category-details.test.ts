import { ParentCategoryDetailsModel, ParentCategoryDetails } from "./parent-category-details"

test("can be created", () => {
  const instance: ParentCategoryDetails = ParentCategoryDetailsModel.create({})

  expect(instance).toBeTruthy()
})