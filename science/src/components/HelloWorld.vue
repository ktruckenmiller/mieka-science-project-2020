<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img
          :src="require('../assets/robot.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="say"
            :counter="10"
            label="What should I say?"
            required
          ></v-text-field>

          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Voice is required']"
            label="My Voice"
            required
          ></v-select>


          <v-btn
            color="success"
            class="mr-4"
            @click="talk"
          >
            TALK!
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :items="binary"
        :headers="headers"
      >
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'HelloWorld',

    data: () => ({
      myVar: "",
      say: "",
      select: "Amy",
      items: [
        "Aditi",
        "Amy",
        "Bianca",
        "Brian",
        "Camila",
        "Vicki"
      ],
      headers: [{
        text: 'char',
        value: 'char'
      }, {
        text: 'code',
        value: 'code'
      }]

    }),
    methods: {
      talk () {
        this.axios.post('http://localhost:3020', {
          text: this.say,
          voice: this.select
        }).then((response) => {
          console.log(response.data)
          let audio = new Audio(response.data);
          audio.play();
        })
      },
      reset () {}
    },
    computed: {
      binary: (that) => {
        let chars = that.say.split('')

        return chars.map( (val) => {
          return {
            char: val,
            code: val.charCodeAt(0).toString(2)
          }
        })
      }
    }
  }
</script>
