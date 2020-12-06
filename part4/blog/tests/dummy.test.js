const list_helper = require("../utils/list_helper")

describe('dummy', () => {
    test('dummy_list_helper', () => {
        const blogs = []
        const result = list_helper.dummy(blogs)

        expect(result).toBe(0)
    })
})