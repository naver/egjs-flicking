export function insertCode(id: string, index: string | number, code: string) {
  document.querySelector<HTMLElement>(`#${id} [data-script=flicking${index}]`)!.innerText = code.trim();
}

export function counter(max: number) {
  const counterArray: number[] = [];
  for (let i = 0; i < max; i += 1) {
    counterArray[i] = i;
  }
  return counterArray;
}
