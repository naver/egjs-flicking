/** api-extractor-model 클래스들의 경우 instanceof 를 이용하여 타입 가드 함수를 정의하면 된다. */

import {
  ApiClass,
  ApiDocumentedItem,
  ApiFunction,
  ApiInterface,
  type ApiItem,
  ApiMethod,
  ApiProperty,
  ApiPropertySignature,
  ApiTypeAlias,
  ApiVariable
} from "@microsoft/api-extractor-model";

export const isApiDocumentedItem = (item: ApiItem): item is ApiDocumentedItem => {
  return item instanceof ApiDocumentedItem;
};

// 인터페이스를 의미하는 타입
export const isApiInterface = (item: ApiItem): item is ApiInterface => {
  return item instanceof ApiInterface;
};

// 인터페이스의 각 항목들.
export const isApiPropertySignature = (item: ApiItem): item is ApiPropertySignature => {
  return item instanceof ApiPropertySignature;
};

// 클래스를 의미하는 타입
export const isApiClass = (item: ApiItem): item is ApiClass => {
  return item instanceof ApiClass;
};

// 클래스의 프로퍼티 (getter로 정의한 것들도 포함된다);
export const isApiProperty = (item: ApiItem): item is ApiProperty => {
  return item instanceof ApiProperty;
};

export const isApiMethod = (item: ApiItem): item is ApiMethod => {
  return item instanceof ApiMethod;
};

// 함수를 의미하는 타입
export const isApiFunction = (item: ApiItem): item is ApiFunction => {
  return item instanceof ApiFunction;
};

// 변수를 의미하는 타입
export const isApiVariable = (item: ApiItem): item is ApiVariable => {
  return item instanceof ApiVariable;
};

// 타입 별칭을 의미하는 타입
export const isApiTypeAlias = (item: ApiItem): item is ApiTypeAlias => {
  return item instanceof ApiTypeAlias;
};

/**
 * Type guard to check if an ApiItem has a displayName property.
 * This is useful for safely accessing displayName without type assertions.
 */
export interface WithDisplayName {
  displayName: string;
}

export const hasDisplayName = (item: ApiItem): item is ApiItem & WithDisplayName => {
  return "displayName" in item && typeof (item as WithDisplayName).displayName === "string";
};

/**
 * Get display name from an ApiItem, falling back to kind if unavailable.
 */
export const getDisplayName = (item: ApiItem): string => {
  return hasDisplayName(item) ? item.displayName : item.kind;
};
