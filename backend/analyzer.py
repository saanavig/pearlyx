import pickle
import os

class Analyzer:
    def __init__(self, file):
        self.file = file
        self.load_file()

    def load_file(self):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(script_dir, 'models/model.pkl')
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        self.model = model
    
    def predict(self, params): # params is a 2D numpy array
        return self.model.predict(params)
    
    # more functions for creating measurements
