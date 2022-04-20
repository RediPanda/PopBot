const { Message, Client, MessageEmbed, Channel } = require('discord.js');
const Schema = require('../../models/modlogs');

module.exports = {
  name: 'set-modlogs',
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return;

    const channel = message.mentions.channels.first() || message.channel;

    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) data.delete();
      new Schema({
        Guild: message.guild.id,
        Channel: channel.id,
      }).save();
      message.channel.send(`${channel} has been set`)
    })
  },
};
