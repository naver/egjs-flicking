/** tsDoc AST 노드들의 경우 kind 프로퍼티를 이용해서 타입 가드 함수들을 정의하면 된다. */

import {
  type DocFencedCode,
  type DocInlineTag,
  type DocLinkTag,
  type DocNode,
  DocNodeKind,
  type DocParagraph,
  type DocPlainText,
  type DocSoftBreak
} from "@microsoft/tsdoc";

export const isParagraph = (node: DocNode): node is DocParagraph => {
  return node.kind === DocNodeKind.Paragraph;
};

// text 프로퍼티를 가진 노드이다. text에 주석 문자열이 들어 있다. (태그 및 태그와 관련된 것들은 여기에 없음)
export const isPlainText = (node: DocNode): node is DocPlainText => {
  return node.kind === DocNodeKind.PlainText;
};

// 줄바꿈 문자를 의미하는 노드로 추정됨.
export const isSoftBreak = (node: DocNode): node is DocSoftBreak => {
  return node.kind === DocNodeKind.SoftBreak;
};

// 코드 블록의 내용과 언어 정보가 들어 있다.
export const isFencedCode = (node: DocNode): node is DocFencedCode => {
  return node.kind === DocNodeKind.FencedCode;
};

// 링크에 대한 정보가 들어 있다.
export const isLinkTag = (node: DocNode): node is DocLinkTag => {
  return node.kind === DocNodeKind.LinkTag;
};

export const isInLineTag = (node: DocNode): node is DocInlineTag => {
  return node.kind === DocNodeKind.InlineTag;
};
