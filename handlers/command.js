//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { readdirSync } = require(`fs`);
const ascii = require(`ascii-table`);
const table = new ascii().setHeading(`Command`, `Status`);

//////////////////////////////  EXPORT HANDLER  //////////////////////////////
module.exports = (client) => {
    console.log();
    readdirSync(`./commands/`).forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(`.js`));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(`.${file.slice(0, file.length - 3)}`, `On`)
            }
            else {
                table.addRow(file, `Off --> Missing...`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
    console.log();
}