export function insertCode(id: string, index: string | number, code: string) {
  document.querySelector<HTMLElement>(`#${id} [data-script=flicking${index}]`)!.innerText = code.trim();
}
