import React, { useRef, useEffect, ReactElement, FC,createRef } from "react";
import { Card } from "antd";
// import { PropTypes } from "prop-types";
// import Typing from "@/untils/typing";
import Typing from "../../untils/typing";

interface PropsType {
  title: object;
  source: string
}

const TypingCard: FC<PropsType> = (props): ReactElement => {
  const { title, source } = props;

  // const sourceEl = useRef();
  // const outputEl = useRef();
  const sourceEl = createRef<HTMLInputElement>();
  const outputEl = createRef<HTMLInputElement>();

  useEffect(() => {
    const typing = new Typing({
      source: sourceEl.current,
      output: outputEl.current,
      delay: 30,
    });
    typing.start();
  }, []);
  return (
    <Card bordered={false} className="card-item" title={title}>
      <div
        style={{ display: "none" }}
        ref={sourceEl}
        dangerouslySetInnerHTML={{ __html: source }}
      />
      <div ref={outputEl} />
    </Card>
  );
};

// TypingCard.propTypes = {
//   title: PropTypes.object,
//   source: PropTypes.string,
// };

// TypingCard.defaultProps = {
//   title: "",
//   source: "",
// };

export default TypingCard;
