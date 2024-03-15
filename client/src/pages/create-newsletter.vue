<script setup lang="ts">
const name = ref("name");
const phone = ref("phone");
const email = ref("email");
const select = ref("select");
const checkbox = ref("checkbox");

const drawer = ref(false);
</script>

<template>
  <div>
    <div
      class="v-container v-container--fluid v-locale--is-ltr page-wrapper pb-sm-15 pb-10"
    >
      <div class="maxWidth">
        <div
          class="v-card v-card--density-default rounded-md v-card--variant-elevated bg-lightprimary elevation-0 rounded-md mb-8"
        >
          <div class="v-card__loader">
            <div
              class="v-progress-linear v-theme--BLUE_THEME v-locale--is-ltr"
              role="progressbar"
              aria-hidden="true"
              aria-valuemin="0"
              aria-valuemax="100"
              style="
                top: 0px;
                height: 0px;
                --v-progress-linear-height: 2px;
                left: 50%;
                transform: translateX(-50%);
              "
            >
              <div
                class="v-progress-linear__background"
                style="width: 100%"
              ></div>
              <div class="v-progress-linear__indeterminate">
                <div class="v-progress-linear__indeterminate long"></div>
                <div class="v-progress-linear__indeterminate short"></div>
              </div>
            </div>
          </div>
          <div class="px-8 py-8 py-lg-0">
            <div class="d-flex justify-space-between">
              <div class="d-flex py-0 align-center">
                <div>
                  <h3 class="text-h5 mb-2">Создание рассылок</h3>
                </div>
              </div>
            </div>
          </div>
          <span class="v-card__underlay"></span>
        </div>
        <div
          class="v-card v-card--density-default elevation-10 rounded-md v-card--variant-elevated"
        >
          <!---->
          <div class="v-card__loader">
            <div
              class="v-progress-linear v-theme--BLUE_THEME v-locale--is-ltr"
              role="progressbar"
              aria-hidden="true"
              aria-valuemin="0"
              aria-valuemax="100"
              style="
                top: 0px;
                height: 0px;
                --v-progress-linear-height: 2px;
                left: 50%;
                transform: translateX(-50%);
              "
            >
              <!---->
              <div
                class="v-progress-linear__background"
                style="width: 100%"
              ></div>
              <div class="v-progress-linear__indeterminate">
                <div class="v-progress-linear__indeterminate long"></div>
                <div class="v-progress-linear__indeterminate short"></div>
              </div>
              <!---->
            </div>
          </div>
          <div class="d-flex mainbox">
            <!---->
            <div class="right-part">
              <button
                type="button"
                class="v-btn v-btn--block v-theme--BLUE_THEME v-btn--density-default v-btn--size-default v-btn--variant-text d-lg-none d-md-flex d-sm-flex"
              >
                <span class="v-btn__overlay"></span
                ><span class="v-btn__underlay"></span
                ><!----><span class="v-btn__content" data-no-activator=""
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon-tabler icon-tabler-menu-2 mr-2"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6l16 0"></path>
                    <path d="M4 12l16 0"></path>
                    <path d="M4 18l16 0"></path>
                  </svg>
                  Шаблоны </span
                ><!----><!---->
              </button>
              <hr
                class="v-divider d-lg-none d-block"
                aria-orientation="horizontal"
                role="separator"
              />
              <div class="v-sheet">
                <div
                  class="v-sheet v-theme--BLUE_THEME py-3 pl-6 pr-4 d-flex align-center"
                >
                  <h4 class="text-h6">Редактирование шаблона</h4>
                  <div class="ml-auto">
                    <div class="v-sheet v-theme--BLUE_THEME">
                      <button
                        type="button"
                        class="v-btn v-btn--elevated v-theme--BLUE_THEME bg-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated"
                      >
                        <span class="v-btn__overlay"></span
                        ><span class="v-btn__underlay"></span
                        ><!----><span
                          class="v-btn__content"
                          data-no-activator=""
                          >Добавить шаблон рассылки</span
                        ><!----><!----></button
                      ><!----><!---->
                    </div>
                  </div>
                </div>
                <hr
                  class="v-divider v-theme--BLUE_THEME"
                  aria-orientation="horizontal"
                  role="separator"
                />
                <div class="v-sheet v-theme--BLUE_THEME">
                  <div class="v-sheet v-theme--BLUE_THEME pa-6">
                    <h4 class="text-h6 mb-4">Изменить заголовок</h4>
                    <div
                      class="v-input v-input--horizontal v-input--density-comfortable v-locale--is-ltr v-input--dirty v-textarea v-text-field"
                    >
                      <!---->
                      <div class="v-input__control">
                        <div
                          class="v-field v-field--active v-field--dirty v-field--no-label v-field--variant-outlined v-theme--BLUE_THEME v-locale--is-ltr"
                        >
                          <div class="v-field__overlay"></div>
                          <div class="v-field__loader">
                            <div
                              class="v-progress-linear v-theme--BLUE_THEME v-locale--is-ltr"
                              role="progressbar"
                              aria-hidden="true"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="
                                top: 0px;
                                height: 0px;
                                --v-progress-linear-height: 2px;
                                left: 50%;
                                transform: translateX(-50%);
                              "
                            >
                              <!---->
                              <div
                                class="v-progress-linear__background bg-primary"
                                style="width: 100%"
                              ></div>
                              <div class="v-progress-linear__indeterminate">
                                <div
                                  class="v-progress-linear__indeterminate long bg-primary"
                                ></div>
                                <div
                                  class="v-progress-linear__indeterminate short bg-primary"
                                ></div>
                              </div>
                              <!---->
                            </div>
                          </div>
                          <!---->
                          <div class="v-field__field" data-no-activator="">
                            <!----><label
                              class="v-label v-field-label"
                              for="input-179"
                              ><!----><!----></label
                            ><!----><textarea
                              class="v-field__input"
                              rows="5"
                              name="Note"
                              id="input-179"
                              aria-describedby="input-179-messages"
                              outlined=""
                            ></textarea
                            ><!----><!---->
                          </div>
                          <!----><!---->
                          <div class="v-field__outline">
                            <div class="v-field__outline__start"></div>
                            <!---->
                            <div class="v-field__outline__end"></div>
                            <!---->
                          </div>
                        </div>
                      </div>
                      <!---->
                      <div class="v-input__details">
                        <div
                          class="v-messages"
                          role="alert"
                          aria-live="polite"
                          id="input-179-messages"
                        ></div>
                        <!---->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav
            class="v-navigation-drawer v-navigation-drawer--left v-navigation-drawer--temporary v-theme--BLUE_THEME v-navigation-drawer--mobile"
            top=""
            style="
              left: 0px;
              z-index: 1004;
              transform: translateX(-110%);
              position: fixed;
              height: calc(100% - 70px);
              top: 70px;
              bottom: 0px;
              width: 320px;
            "
          >
            <!----><!---->
            <div class="v-navigation-drawer__content">
              <div class="v-card-text pa-0">
                <div data-v-a79b6095="" class="pa-6">
                  <h4 class="text-h6 mb-4">All Notes</h4>
                  <div class="mb-5">
                    <div
                      class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-locale--is-ltr v-text-field"
                    >
                      <!---->
                      <div class="v-input__control">
                        <div
                          class="v-field v-field--appended v-field--center-affix v-field--no-label v-field--variant-outlined v-theme--BLUE_THEME v-locale--is-ltr"
                        >
                          <div class="v-field__overlay"></div>
                          <div class="v-field__loader">
                            <div
                              class="v-progress-linear v-theme--BLUE_THEME v-locale--is-ltr"
                              role="progressbar"
                              aria-hidden="true"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="
                                top: 0px;
                                height: 0px;
                                --v-progress-linear-height: 2px;
                                left: 50%;
                                transform: translateX(-50%);
                              "
                            >
                              <!---->
                              <div
                                class="v-progress-linear__background bg-primary"
                                style="width: 100%"
                              ></div>
                              <div class="v-progress-linear__indeterminate">
                                <div
                                  class="v-progress-linear__indeterminate long bg-primary"
                                ></div>
                                <div
                                  class="v-progress-linear__indeterminate short bg-primary"
                                ></div>
                              </div>
                              <!---->
                            </div>
                          </div>
                          <!---->
                          <div class="v-field__field" data-no-activator="">
                            <!----><label
                              class="v-label v-field-label"
                              for="input-176"
                              ><!----><!----></label
                            ><!----><input
                              placeholder="Search Notes"
                              size="1"
                              type="text"
                              id="input-176"
                              aria-describedby="input-176-messages"
                              class="v-field__input"
                            /><!---->
                          </div>
                          <!---->
                          <div class="v-field__append-inner">
                            <!----><i
                              class="mdi-magnify mdi v-icon notranslate v-theme--BLUE_THEME v-icon--size-default"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div class="v-field__outline">
                            <div class="v-field__outline__start"></div>
                            <!---->
                            <div class="v-field__outline__end"></div>
                            <!---->
                          </div>
                        </div>
                      </div>
                      <!----><!---->
                    </div>
                  </div>
                  <div
                    class="v-sheet v-theme--BLUE_THEME note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4 bg-lightprimary"
                  >
                    <h6 class="text-h6 text-truncate text-primary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </h6>
                    <div class="d-flex mt-3 align-center">
                      <small class="text-subtitle-2 opacity-25"
                        >04.06.2023</small
                      ><button
                        type="button"
                        class="v-btn v-btn--icon v-theme--BLUE_THEME v-btn--density-default v-btn--size-x-small v-btn--variant-text ml-auto"
                        aria-describedby="v-tooltip-187"
                      >
                        <span class="v-btn__overlay"></span
                        ><span class="v-btn__underlay"></span
                        ><!----><span
                          class="v-btn__content"
                          data-no-activator=""
                          ><!----><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon-tabler icon-tabler-trash"
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path
                              d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                            ></path>
                            <path
                              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                            ></path></svg></span
                        ><!----><!---->
                      </button>
                    </div>
                  </div>
                  <div
                    class="v-sheet v-theme--BLUE_THEME note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4 bg-lighterror"
                  >
                    <h6 class="text-h6 text-truncate text-error">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo. Nemo
                      enim ipsam voluptatem quia voluptas sit aspernatur aut
                      odit aut fugit,
                    </h6>
                    <div class="d-flex mt-3 align-center">
                      <small class="text-subtitle-2 opacity-25"
                        >03.06.2023</small
                      ><button
                        type="button"
                        class="v-btn v-btn--icon v-theme--BLUE_THEME v-btn--density-default v-btn--size-x-small v-btn--variant-text ml-auto"
                        aria-describedby="v-tooltip-189"
                      >
                        <span class="v-btn__overlay"></span
                        ><span class="v-btn__underlay"></span
                        ><!----><span
                          class="v-btn__content"
                          data-no-activator=""
                          ><!----><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon-tabler icon-tabler-trash"
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path
                              d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                            ></path>
                            <path
                              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                            ></path></svg></span
                        ><!----><!---->
                      </button>
                    </div>
                  </div>
                  <div
                    class="v-sheet v-theme--BLUE_THEME note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4 bg-lightwarning"
                  >
                    <h6 class="text-h6 text-truncate text-warning">
                      consectetur, adipisci velit, sed quia non numquam eius
                      modi tempora incidunt ut labore et dolore magnam aliquam
                      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                      exercitationem ullam corporis suscipit laboriosam, nisi ut
                      aliquid ex ea commodi consequatur?
                    </h6>
                    <div class="d-flex mt-3 align-center">
                      <small class="text-subtitle-2 opacity-25"
                        >02.06.2023</small
                      ><button
                        type="button"
                        class="v-btn v-btn--icon v-theme--BLUE_THEME v-btn--density-default v-btn--size-x-small v-btn--variant-text ml-auto"
                        aria-describedby="v-tooltip-191"
                      >
                        <span class="v-btn__overlay"></span
                        ><span class="v-btn__underlay"></span
                        ><!----><span
                          class="v-btn__content"
                          data-no-activator=""
                          ><!----><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon-tabler icon-tabler-trash"
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path
                              d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                            ></path>
                            <path
                              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                            ></path></svg></span
                        ><!----><!---->
                      </button>
                    </div>
                  </div>
                  <div
                    class="v-sheet v-theme--BLUE_THEME note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4 bg-lightsuccess"
                  >
                    <h6 class="text-h6 text-truncate text-success">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </h6>
                    <div class="d-flex mt-3 align-center">
                      <small class="text-subtitle-2 opacity-25"
                        >04.06.2023</small
                      ><button
                        type="button"
                        class="v-btn v-btn--icon v-theme--BLUE_THEME v-btn--density-default v-btn--size-x-small v-btn--variant-text ml-auto"
                        aria-describedby="v-tooltip-193"
                      >
                        <span class="v-btn__overlay"></span
                        ><span class="v-btn__underlay"></span
                        ><!----><span
                          class="v-btn__content"
                          data-no-activator=""
                          ><!----><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon-tabler icon-tabler-trash"
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path
                              d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                            ></path>
                            <path
                              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                            ></path></svg></span
                        ><!----><!---->
                      </button>
                    </div>
                  </div>
                  <!---->
                </div>
              </div>
            </div>
            <!---->
          </nav>
          <!----><!----><!----><span class="v-card__underlay"></span>
        </div>
        <button
          type="button"
          class="v-btn v-btn--icon v-theme--BLUE_THEME bg-primary v-btn--density-default v-btn--size-large v-btn--variant-flat customizer-btn"
        >
          <span class="v-btn__overlay"></span
          ><span class="v-btn__underlay"></span
          ><!----><span class="v-btn__content" data-no-activator=""
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon-tabler icon-tabler-settings"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
              ></path>
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path></svg></span
          ><!----><!---->
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.mainbox {
  position: relative;
  overflow: hidden;
}
.right-part {
  width: 100%;
  min-height: 500px;
  position: relative;
}
</style>
