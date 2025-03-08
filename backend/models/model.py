import pandas as pd
import xgboost as xgb
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_dir, 'Parkinsons_Speech-Features.csv')
df = pd.read_csv(csv_path)
key_features = ['numPulses',
    'numPeriodsPulses',
    'meanPeriodPulses',
    'stdDevPeriodPulses',
    'locPctJitter',
    'locAbsJitter',
    'rapJitter',
    'ppq5Jitter',
    'ddpJitter',
    'locShimmer',
    'locDbShimmer',
    'apq3Shimmer',
    'apq5Shimmer',
    'apq11Shimmer',
    'ddaShimmer',
    'meanAutoCorrHarmonicity',
    'meanNoiseToHarmHarmonicity',
    'meanHarmToNoiseHarmonicity',
    'minIntensity',
    'maxIntensity',
    'meanIntensity',
    'f1', 'f2', 'f3', 'f4',
    'b1', 'b2', 'b3', 'b4']

X = df[key_features]
scaler = StandardScaler()
X = scaler.fit_transform(X)

y = df['class']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2)

model = xgb.XGBClassifier(random_state = 42,
                            n_estimators = 100,
                            learning_rate = 0.1,
                            max_depth = 4,
                            min_child_weight = 2,
                            subsample = 0.8,
                            colsample_bytree = 0.7,
                            gamma = 1,
                            alpha = 0)

model.fit(X_train, y_train)

model_path = os.path.join(script_dir, 'model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump(model, f)