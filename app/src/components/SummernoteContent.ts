import styled from "styled-components";

/**
 * Style content from a Summernote input on the dash. Ionic provides style for
 * most things however this adapts the bootstrap styles to add responsive
 * styling for tables, as well as correcting persistent link colour issues.
 */
const SummernoteContent = styled.div`
  /**
		Responsive Table Styles
	 */
  table {
    width: 100%;
    margin-bottom: 1rem;
    overflow-x: auto;
    display: block;
    -webkit-overflow-scrolling: touch;

    tbody,
    thead {
      display: table;
      width: 100%;
    }

    th,
    td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid currentColor;
    }

    thead th {
      vertical-align: bottom;
      border-bottom: 2px solid currentColor;
      filter: brightness(10%);
    }

    tbody + tbody {
      border-top: 2px solid currentColor;
    }
  }

  /**
		Link Styles
	 */
  a {
    color: currentColor;
  }
`;

export default SummernoteContent;
