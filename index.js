import beneficiaries from "./beneficiaries.json"

;(() => {
  const url = "https://media.interieur.gouv.fr/deplacement-covid-19"

  if (window.dev === false && window.location.href.indexOf(url) !== 0) {
    if (
      confirm(
        "Ce script est uniquement éxécutable sur le générateur d'attestation de déplacement dérogatoire mis en place par le gouvernement. Voulez-vous être rediriger ?"
      )
    ) {
      window.open(url, "_blank")
    }

    return
  }

  const options = beneficiaries
    .map(
      ({ firstname, lastname }, index) =>
        `<option value="${index + 1}">${firstname} ${lastname}</value>`
    )
    .join("")

  const injectionTemplate = `<div id="___bm-cc19" style="background-color:#ffffff;border-bottom:1px solid #ced4da;left:0;margin:-20px;margin-bottom:20px;padding:24px;position:sticky;right:0;text-align:center;top:0;z-index:99999;"><style scoped>@media (min-width:576px){.btn-sm-inline{width:auto;}}</style><form class="form-inline justify-content-center" id="___prefill_form" style="margin: 0;max-width:none;"><select class="form-control mr-sm-3 mb-3 mb-sm-0"><option value="">Sélectionnez la personne concernée</option>${options}</select> <button class="btn btn-primary btn-block btn-sm-inline" disabled="disabled" type="submit">Remplir</button></form></div>`

  const existingContainer = document.getElementById("___bm-cc19")

  if (existingContainer) {
    existingContainer.parentNode.removeChild(existingContainer)
  }

  document.body.firstElementChild.insertAdjacentHTML(
    "beforebegin",
    injectionTemplate
  )

  const form = document.getElementById("___prefill_form")

  const select = form.querySelector("select")
  const button = form.querySelector('button[type="submit"]')

  select.addEventListener(
    "change",
    (event) => {
      button.disabled = event.currentTarget.value === ""
    },
    false
  )

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault()

      const beneficiary = beneficiaries[parseInt(select.value, 10) - 1]

      Object.keys(beneficiary).forEach((key) => {
        document.querySelector(`input[name="${key}"]`).value = beneficiary[key]
        document.querySelector(
          `input[name="field-reason"][value="courses"]`
        ).checked = true
      })
    },
    false
  )
})()
