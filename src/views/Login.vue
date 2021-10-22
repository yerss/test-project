<template>
  <div>
    <div class="form">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step
              :complete="step > 1"
              step="1"
          >
            Персональная информация
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">
            Детали Сертификата
          </v-stepper-step>


        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="form__block">
              <div class="form__block_left">
                <v-text-field
                    label="Имя"
                    outlined
                    dense
                    v-model="form1.name"
                ></v-text-field>
                <v-text-field
                    label="Фамилия"
                    outlined
                    dense
                    v-model="form1.surname"
                ></v-text-field>
                <v-text-field
                    label="Номер удостоверения личности"
                    outlined
                    dense
                    v-model="form1.documentNumber"
                    hide-details
                ></v-text-field>
                <v-text-field
                    label="Номер телефона"
                    outlined
                    dense
                    v-model="form1.phoneNumber"
                    hide-details
                ></v-text-field>
              </div>
              <div  class="form__block_right">
                <v-file-input
                    label="Загрузить изображение"
                    full-width="100px"
                    height="120"
                    outlined
                    v-model="form1.img"
                    hide-details
                ></v-file-input>
              </div>
            </div>
            <div class="form__footer">
              <v-select
                  outlined
                  dense
                  label="Тип оружия"
                  :items="gunType"
                  item-text="text"
                  item-value="id"
                  hide-details
                  v-model="form1.gunType"
              >
              </v-select>
              <v-text-field
                  outlined
                  dense
                  label="Номер машины"
                  hide-details
                  v-model="form1.autoNumber"
              >

              </v-text-field>
            </div>
            <div class="form__actions">
              <v-btn
                  color="primary"
                  @click="step = 2"
              >
                Далее
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div class="form__block">
              <div class="d-flex">
                <div class="d-flex">
                  <v-text-field
                      class="mr-2"
                      outlined
                      dense
                      type="date"
                      label="Дата от"
                      v-model="form2.dateFrom"
                  ></v-text-field>
                  <v-text-field
                      class="mr-2"
                      outlined
                      dense
                      type="date"
                      label="Дата до"
                      v-model="form2.dateTo"
                  ></v-text-field>
                </div>
                <div class="d-flex">
                  <v-menu
                      ref="menu"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="form2.timeFrom"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          outlined
                          dense
                          v-model="form2.timeFrom"
                          label="Время от"
                          prepend-inner-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          class="mr-2"

                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menu1"
                        v-model="form2.timeFrom"
                        full-width
                        @click:minute="$refs.menu.save(form2.timeFrom)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="form2.timeTo"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          outlined
                          dense
                          v-model="form2.timeTo"
                          label="Время до"
                          prepend-inner-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menu2"
                        v-model="form2.timeTo"
                        full-width
                        @click:minute="$refs.menu.save(form2.timeTo)"
                    ></v-time-picker>
                  </v-menu>
                </div>
              </div>

            </div>
            <div class="px-2">
              <v-textarea
                  v-model="form2.visitPurpose"
                  outlined
                  label="Цель визита"
                  rows="2"
                  hide-details
              ></v-textarea>
              <v-checkbox
                  v-model="form2.entranceWithWeapons"
                  label="Вход с оружием"
                  color="info"
                  value="info"
              ></v-checkbox>
              <v-text-field
                  v-model="form2.comment"
                  outlined
                  dense
                  label="Комментарий"
              >
              </v-text-field>
            </div>
            <div class="px-2">
              <v-btn
                  @click="addEntry"
              >
                Добавьте новый вход
              </v-btn>
              <v-checkbox
                  v-model="dataIntegrity"
                  label="Целостность данных подтверждает"
                  color="info"
                  value="info"
                  hide-details
              ></v-checkbox>
              <v-checkbox
                  v-model="rulesAgreement"
                  label="С правилами поведения в селе соглашаются"
                  color="info"
                  value="info"
                  hide-details
              ></v-checkbox>
            </div>

            <div class="mt-8" v-show="arrayEntries.length > 0">
              <v-data-table
                  :headers="cols"
                  :items="arrayEntries"
              >
                <template v-slot:item.entranceWithWeapons="{ item }">
                  {{item.entranceWithWeapons ? 'Да' : 'Нет'}}
                </template>
              </v-data-table>
            </div>

            <div class="form__actions">
              <v-btn
                  @click="step = 1"
                  class="mr-2"
              >
                Вернуться
              </v-btn>
              <v-btn
                  color="success"
                  @click="save"
              >
                Сохранить
              </v-btn>
            </div>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      dataIntegrity: false,
      rulesAgreement: false,
      menu1: '',
      menu2: '',
      step: 1,
      gunType: [
        {
          id: 1,
          text: 'Частная'
        }
      ],
      form1: {
        name: '',
        surname: '',
        documentNumber: '',
        phoneNumber: '',
        img: null,
        gunType: '',
        autoNumber: ''
      },
      form2: {
        visitPurpose: '',
        comment: '',
        timeFrom: '',
        timeTo: '',
        dateFrom: '',
        dateTo: '',
        entranceWithWeapons: ''
      },
      arrayEntries: [],
      cols: [
        {
          text: 'Дата от',
          value: 'dateFrom',
        },
        {
          text: 'Дата до',
          value: 'dateTo',
        },
        {
          text: 'Время от',
          value: 'timeFrom',
        },
        {
          text: 'Время до',
          value: 'timeTo',
        },
        {
          text: 'Комментарий',
          value: 'comment',
        },
        {
          text: 'Цель визита',
          value: 'visitPurpose',
        },
        {
          text: 'Вход с оружием',
          value: 'entranceWithWeapons',
        },
      ]
    }
  },
  methods: {
    ...mapActions({
      addUserInfo: 'addUserInfo',
      addUserEntries: 'addUserEntries'
    }),
    addEntry() {
      this.arrayEntries.push(this.form2)
      this.form2 = {
        visitPurpose: '',
        comment: '',
        timeFrom: '',
        timeTo: '',
        dateFrm: '',
        dateTo: '',
        entranceWithWeapons: ''
      }
    },
    save() {
      if (this.rulesAgreement && this.dataIntegrity) {
        this.addUserEntries(this.arrayEntries)
        this.addUserInfo(this.form1)
        this.$router.push('/user')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 750px;
  margin: 200px auto;
  &__actions {
    margin-top: 32px;
  }
  &__footer {
    background-color: #F7F8FA;
    padding: 12px;
    display: flex;
    & > div:nth-child(odd) {
      margin-right: 16px;
    }
  }
  &__block {
    display: flex;
    padding: 12px;
    &_right {
      width: 20%;
    }
    &_left {
      margin-right: 16px;
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      & > div:nth-child(odd) {
        margin-right: 16px;
      }
    }
  }
}
</style>
