/*
    Module to perform CRUD operations.
    Author: Dinesh Sonachalam
*/
import YAML from 'yaml'
import fetch from 'cross-fetch';

/**
 * GET Request
 * @param {String} url 
 * @param {Object} headers
 * @returns {Object} jsonResponse
 */
export const get = async function(url, headers) {
    const requestOptions = {
        method: "GET",
        headers: headers
    }
    const response = await fetch(url, requestOptions)
    const jsonResponse = await response.json()
    return jsonResponse
}

/**
 * GET Yaml config value
 * @param {String} url 
 * @param {Object} headers 
 * @param {String} filter 
 * @returns {String} yaml_doc[filter]
 */
export const getYamlConfigValue = async function(url, headers, filter) {
    const requestOptions = {
        method: "GET",
        headers: headers
    }
    const response = await fetch(url, requestOptions)
    const textResponse = await response.text()
    const yaml_doc = YAML.parse(textResponse);
    return yaml_doc[filter]
}