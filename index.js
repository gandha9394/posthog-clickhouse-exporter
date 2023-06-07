// <TODO: your plugin code here - you can base it on the code below, but you don't have to>
import clickhouse from '@clickhouse/client';

// Some internal library function
async function getRandomNumber() {
    const client = clickhouse.createClient({
        host: 'clickhouse-dev.setu.co',
        port: 443,
        username: 'gb_test',
        password: 'test@1234',
        database: 'fiu_posthog_db'
    })
    const res = await client.query({query: "select * from events;"})
    console.log(res)
    return 4
}

// Plugin method that runs on plugin load
export async function setupPlugin({ config }) {
    console.log(`Setting up the plugin`)
    const client = clickhouse.createClient({
        host: 'clickhouse-dev.setu.co',
        port: 443,
        username: 'gb_test',
        password: 'test@1234',
        database: 'fiu_posthog_db'
    })
    const res = await client.query({query: "select * from events;"})
    console.log(res)
    return 4
}

// Plugin method that processes event
export async function processEvent(event, { config, cache }) {
    const counterValue = (await cache.get('greeting_counter', 0))
    cache.set('greeting_counter', counterValue + 1)
    if (!event.properties) event.properties = {}
    event.properties['greeting'] = config.greeting
    event.properties['greeting_counter'] = counterValue
    event.properties['random_number'] = await getRandomNumber()
    return event
}