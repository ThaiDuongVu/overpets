//#region Bootstrap functions

/* eslint-disable */
export const initTooltip = (bootstrap: any) => {
  const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

/* eslint-disable */
export const showToast = (bootstrap: any, id: string) => {
  const element = document.getElementById(id);
  const toast = bootstrap.Toast.getOrCreateInstance(element);
  toast.show();
};

//#endregion