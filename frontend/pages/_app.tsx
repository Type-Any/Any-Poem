import App, { Container, AppComponentContext } from "next/app"
import Nav from "../components/Nav"
import Head from "next/head"
import React from "react"

class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }: AppComponentContext) {
		let pageProps = {}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	public render() {
		const { Component, pageProps } = this.props
		return (
			<Container>
				<Head>
					<title>Any Poem</title>
				</Head>
				<Nav />
				<Component {...pageProps} />
			</Container>
		)
	}
}

export default MyApp
