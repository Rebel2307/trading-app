import numpy as np
import tensorflow as tf
from tensorflow import keras

# Dummy dataset (replace with real market data)
X = np.random.rand(1000, 5)
y = np.random.rand(1000, 1)

model = keras.Sequential([
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse')
model.fit(X, y, epochs=10)

model.save("model.h5")

# Prediction function
def predict(data):
    model = keras.models.load_model("model.h5")
    return model.predict(np.array([data])).tolist()