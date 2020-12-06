const { stat } = require("fs")

const dummy = (blogs) => {
    return blogs.length
}

const totalLikes = (blogs) => {
    const summation = (sum, blog) => (sum + blog.likes)
    return blogs.reduce(summation, 0)

}

const favorite = (blogs) => {
    const max_likes = (max, blog) => {
        if (max.likes === blog.likes)
            return max

        if (Math.max(max.likes, blog.likes) === blog.likes)
        {
            max = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }

        return max
    }
    return blogs.reduce(max_likes)
}

const is_max = (max, curr) => curr > max ? true : false

const blogStats = (blogs) => {
    let blogMap = new Map()
    let mostBlogs = 0
    let mostLikes = 0
    let result = {}

    blogs.forEach(blog => {
        let stats = {articleCount: 0, likeCount: 0}
        if (blogMap.has(blog.author))
        {
            stats = blogMap.get(blog.author)
        }

        stats.articleCount += 1
        stats.likeCount += blog.likes

        let resultBlogs = result.mostBlogs
        let resultLikes = result.mostLikes
        if (is_max(mostBlogs, stats.articleCount) === true)
        {
            resultBlogs = {
                author: blog.author,
                blogs: stats.articleCount
            }
            mostBlogs = stats.articleCount
        }
        if (is_max(mostLikes, stats.likeCount) === true)
        {
            resultLikes = {
                author: blog.author,
                blogs: stats.likeCount
            }
            mostLikes = stats.likeCount
        }

        result = {
            mostBlogs : resultBlogs,
            mostLikes: resultLikes
        }

        console.log(`result is `, result)
        blogMap.set(blog.author, stats)
    });

    return result
}

const mostBlogs = (blogs) => {
    const result = blogStats(blogs)
    return result.mostBlogs
}

const mostLikes = (blogs) => {
    const result = blogStats(blogs)
    return result.mostLikes
}

module.exports = {dummy, totalLikes, favorite, mostBlogs, mostLikes}