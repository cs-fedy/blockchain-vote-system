type JSONPrimitive = string | number | boolean
type JSONArray = JSONValue[]
type JSONObject = { [k: string]: JSONValue }
type JSONValue = JSONArray | JSONObject | JSONPrimitive
type JSON = Record<string, JSONValue>

export default JSON
