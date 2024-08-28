const { db } = require('../config/firebaseConfig');

const getConfigs = async () => {
  const configRef = db.collection('configurations');
  const snapshot = await configRef.get();


  const configs = snapshot.docs.map(doc => ({
    id: doc.id, 
    ...doc.data()
  }));


  return configs;
};


const updateConfig = async (newConfig, id) => {
  const docRef = db.collection('configurations').doc(id);
  
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error('No configuration found');
  }

  await docRef.set(newConfig, { merge: true }); 
};


const deleteConfig = async (id) => {
  const configRef = db.collection('configurations').doc(id); 
  const doc = await configRef.get();

  if (!doc.exists) {
    throw new Error('No configuration found to delete');
  }

  await configRef.delete(); 

  return  'Configuration deleted successfully';
};


const addConfig = async (newConfig) => {
  const configRef = db.collection('configurations');

  await configRef.add(newConfig);


};

const getConfigById = async (id) => {
  const configRef = db.collection('configurations').doc(id);
  const doc = await configRef.get();

  if (!doc.exists) {
    throw new Error('No configuration found');
  }

  return doc.data();
};

module.exports = { getConfigs, updateConfig, deleteConfig, addConfig,getConfigById };
