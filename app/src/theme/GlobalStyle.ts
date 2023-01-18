import { createGlobalStyle } from "styled-components";

/**
 * Add global CSS rules (that are not component based) to this
 */
const GlobalStyle = createGlobalStyle`
	body {
	  
	}

	.mr-0 {
		margin-right: 0px;
	}

	.flex-02 {
		flex-grow: 0.2;
	}

	.hide-this {
		display: none;
	}

	.scanner-end-button {
		position:absolute;
    bottom:0px;
	}
`;

export default GlobalStyle;
