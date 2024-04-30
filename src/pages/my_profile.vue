<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Россия</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Надежда Галлини</div>
              <div class="text-caption text-grey">
                ИП | И.о. начальника ЦИТ | Старший преподаватель |  Инженер данных
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="Nadia.jpg"
              />
            </q-card-section>
          </q-card-section>

          <q-separator/>

          <q-card-section>
            Концептуализацию, дизайн и разработку сайтов, объединяю с глубоким анализом рынка и SEO-оптимизацией для создания виртуальных пространств, которые не только визуально привлекательны, но и стратегически оптимизированы для максимальной видимости и вовлечения. Интеграция с социальными сетями придает дополнительные возможности для расширения аудитории и укрепления онлайн-присутствия бренда, подчеркивая его уникальные черты в сфере цифрового мира.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.first_name"
                label="Имя"
                lazy-rules
              />

              <q-input
                filled
                v-model="user.last_name"
                label="Фамилия"
                lazy-rules

              />

              <q-input
                filled
                v-model="user.age"
                label="Возвраст"
                lazy-rules

              />

              <q-input
                filled
                v-model="user.email"
                label="Email"
                lazy-rules

              />

              <q-input
                filled
                v-model="user.phone"
                label="Номер телефона"
                lazy-rules

              />

              <div>
                <q-btn label="Обновить" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    first_name: 'Надежда',
                    last_name: 'Галлини',
                    age: 47,
                    email: 'g******@****.com',
                    phone: '+7978******44'
                },
            }
        },
    }
</script>

<style scoped>

</style>
