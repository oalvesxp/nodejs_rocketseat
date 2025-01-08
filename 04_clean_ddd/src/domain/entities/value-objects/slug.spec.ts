import { expect, test } from 'vitest'
import { Slug } from './slug'

test('Shoul be able to create a new slug from text', () => {
  const slug = Slug.createFromText('An example question title')

  expect(slug.value).toEqual('an-example-question-title')
})
