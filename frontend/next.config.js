const withTypescript = require("@zeit/next-typescript")
module.exports = withTypescript({
	webpack: (config) => {
		config.node = {
			fs: "empty"
		}

		return config
	}
})
