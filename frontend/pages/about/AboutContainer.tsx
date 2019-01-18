import React from "react"
import AboutPresenter from "./AboutPresenter"
import { NextContext } from "next"

interface IProps {}

export default class extends React.Component<IProps> {
	static async getInitialProps({ req }: NextContext): Promise<{}> {
		const initialProps = {}

		if (req) {
			// server side
		}

		return initialProps
	}

	render() {
		return <AboutPresenter {...this.props} />
	}
}
