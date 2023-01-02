import styled from "styled-components";

export const Timeline = styled.div`
  margin: 0 0 45px;
  padding: 0;
  position: relative;
  // The line
  &::before {
    border-radius: 0.25rem;
    background-color: #dee2e6;
    bottom: 0;
    content: "";
    left: 31px;
    margin: 0;
    position: absolute;
    top: 0;
    width: 4px;
  }
  // Element
  > div {
    &::before,
    &::after {
      content: "";
      display: table;
    }

    margin-bottom: 15px;
    margin-right: 10px;
    position: relative;
    // The content
    > .timeline-item {
      box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
      border-radius: 0.25rem;
      background-color: #fff;
      color: #495057;
      margin-left: 60px;
      margin-right: 15px;
      margin-top: 0;
      padding: 0;
      position: relative;
      // The time and header
      > .time {
        color: #999;
        float: right;
        font-size: 12px;
        padding: 10px;
      }
      // Header
      > .timeline-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        color: #495057;
        line-height: 1.1;
        margin: 0;
        padding: 10px;
        // Link in header
        > a {
          font-weight: 600;
          color: #3880ff !important;
        }
      }
      // Item body and footer
      > .timeline-body,
      > .timeline-footer {
        padding: 10px;
      }

      > .timeline-body {
        > img {
          margin: 10px;
        }
        > dl,
        ol,
        ul {
          margin: 0;
        }
      }

      > .timeline-footer {
        > a {
          color: #fff;
        }
      }
    }
    // The icons at line
    > .fa,
    > .fas,
    > .far,
    > .fab,
    > .fal,
    > .fad,
    > .svg-inline--fa,
    > .ion {
      color: #fff;
      background-color: #007bff;
      border-radius: 50%;
      font-size: 16px;
      height: 30px;
      left: 18px;
      line-height: 30px;
      position: absolute;
      text-align: center;
      top: 0;
      width: 30px;
    }
    > .svg-inline--fa {
      padding: 7px;
    }
  }
  // Time label
  > .time-label {
    > span {
      border-radius: 4px;
      color: #fff;
      background-color: #dc3545;
      display: inline-block;
      font-weight: 600;
      padding: 5px;
    }
  }
`;

export const RedSpan = styled.span`
  border-radius: 4px;
  color: #fff;
  background-color: #dc3545;
  display: inline-block;
  font-weight: 600;
  padding: 5px;
`;
