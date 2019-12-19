/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('v-hd-tooltip', module)
  .addParameters({ percy: { skip: true } })
  .add('default', () => ({
    template: `
    <div>
      <div style="text-align:left">
        <span v-hd-tooltip="'Im gonna make him an offer he cant refuse.'">Don Corleone</span><br><br>
        <span v-hd-tooltip="'Im the one who knocks'">Walter White</span><br><br>
      </div>
      <div style="text-align:center">
        <span v-hd-tooltip="'Thats what I do, I drink and I know things'">Tyrion Lannister</span><br><br>
        <span v-hd-tooltip="'Hodor'">Hodor</span><br><br>
      </div>
      <div style="text-align:right">
        <span v-hd-tooltip="'You come at the king, you best not miss'">Omar Little</span><br><br>
        <span v-hd-tooltip="'Welcome to Fight Club. The first rule of Fight Club is: you do not talk about Fight Club. The second rule of Fight Club is: you DO NOT talk about Fight Club! Third rule of Fight Club: if someone yells ‘stop!’, goes limp, or taps out, the fight is over. Fourth rule: only two guys to a fight. Fifth rule: one fight at a time, fellas. Sixth rule: no shirts, no shoes. Seventh rule: fights will go on as long as they have to. And the eighth and final rule: if this is your first night at Fight Club, you have to fight.'">Tyler Durden</span>
      </div>
    </div>`,
  }))
  .add('left', () => ({
    template: `
    <div style="text-align:center">
      <span v-hd-tooltip.left="'Im gonna make him an offer he cant refuse.'">Don Corleone</span><br><br>
      <span v-hd-tooltip.left="'Im the one who knocks'">Walter White</span><br><br>
      <span v-hd-tooltip.left="'Thats what I do, I drink and I know things'">Tyrion Lannister</span><br><br>
      <span v-hd-tooltip.left="'Hodor'">Hodor</span><br><br>
      <span v-hd-tooltip.left="'You come at the king, you best not miss'">Omar Little<br>(The Wire)<br>(to test multilines)</span><br><br>
      <span v-hd-tooltip.left="'Welcome to Fight Club. The first rule of Fight Club is: you do not talk about Fight Club. The second rule of Fight Club is: you DO NOT talk about Fight Club! Third rule of Fight Club: if someone yells ‘stop!’, goes limp, or taps out, the fight is over. Fourth rule: only two guys to a fight. Fifth rule: one fight at a time, fellas. Sixth rule: no shirts, no shoes. Seventh rule: fights will go on as long as they have to. And the eighth and final rule: if this is your first night at Fight Club, you have to fight.'">Tyler Durden<br>(to test big tooltips)</span>
    </div>`,
  }));
