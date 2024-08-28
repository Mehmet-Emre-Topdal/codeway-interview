const { getConfigs, updateConfig, addConfig, deleteConfig, getConfigById } = require('../services/firebaseService');

async function deleteConfigController(req, res) {
    try {
        const result = await deleteConfig(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


async function updateConfigController(req, res) {
    try {
        const existingConfig = await getConfigById(req.params.id);

        if (req.body.version !== existingConfig.version) {
            throw new Error('Version mismatch: another user has updated the configuration.');
        }

        const newConfig = req.body;
        newConfig.version = existingConfig.version + 1;

        await updateConfig(newConfig, req.params.id);
        res.status(200).send('Configuration updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


async function getConfigsController(req, res) {
    try {
        const client = req.query.client;
        if (!client || (client !== 'web' && client !== 'mobile')) {
            throw new Error('Client type is invalid');
        }

        const configs = await getConfigs();
        let result = [];

        if (client === 'web') {
            result = configs.map(config => ({
                id: config.id,
                key: config.key,
                value: config.value,
                description: config.description,
                createDate: config.createDate,
                version: config.version
            }))

        }
        else if (client === 'mobile') {
            result = {}

            configs.forEach(config => {
                result[config.key] = config.value;
            });
        }


        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


async function addConfigController(req, res) {
    try {
        const config = { ...req.body, version: 1, createDate: new Date().toISOString() };
        await addConfig(config);
        res.status(201).send('Configuration added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    deleteConfigController,
    updateConfigController,
    getConfigsController,
    addConfigController
};