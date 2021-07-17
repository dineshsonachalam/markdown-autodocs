import {get, getYamlConfigValue} from "../utils/crud.js";
describe("should test CRUD functionality", () => {
    test("should test GET Request", async () => {
       let response = await get("https://api.github.com/users/dineshsonachalam", {})
       expect({"login": response.login, "name": response.name})
            .toStrictEqual({ "login": "dineshsonachalam", "name": "Dinesh Sonachalam" });
    });
    
    test("should test GET Yaml config value", async () => {
        let name = await getYamlConfigValue("https://raw.githubusercontent.com/dineshsonachalam/markdown-autodocs/master/action.yml", {}, "name")
        expect(name).toMatch("Markdown autodocs");
    });
});