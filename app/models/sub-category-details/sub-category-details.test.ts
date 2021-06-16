import { SubCategoryDetailsModel, SubCategoryDetails } from "./sub-category-details"

test("can be created", () => {
  const instance: SubCategoryDetails = SubCategoryDetailsModel.create({})

  expect(instance).toBeTruthy()
})