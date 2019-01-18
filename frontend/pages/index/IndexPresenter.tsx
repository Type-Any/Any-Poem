import React from "react"
import styled from "styled-components"

interface IProps {
	from: string
}

export default ({ from }: IProps) => (
	<Container>
		<h1>Index Page</h1>
		<p>Rendered from {from}</p>
	</Container>
)

const Container = styled.div`
	width: 100%;
	padding: 30px 30px;
`
