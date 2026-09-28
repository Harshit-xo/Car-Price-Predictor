from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
cors = CORS(app)
model = pickle.load(open('LinearRegressionModel.pkl', 'rb'))
car = pd.read_csv('cleaned_car.csv')


@app.route('/', methods=['GET'])
def index():
    companies = sorted(car['company'].unique())
    years = sorted(car['year'].unique(), reverse=True)
    fuel_types = car['fuel_type'].unique()

    # {'Maruti': ['Maruti Alto 800', ...], 'Hyundai': [...], ...}
    company_models = {
        comp: sorted(group['name'].unique().tolist())
        for comp, group in car.groupby('company')
    }

    return render_template('index.html',
                           companies=companies,
                           years=years,
                           fuel_types=fuel_types,
                           company_models=company_models)


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    try:
        company = request.form.get('company')
        car_model = request.form.get('car_models')
        year = int(request.form.get('year'))
        fuel_type = request.form.get('fuel_type')
        driven = int(request.form.get('kilo_driven'))

        input_df = pd.DataFrame(
            [[car_model, company, year, driven, fuel_type]],
            columns=['name', 'company', 'year', 'kms_driven', 'fuel_type']
        )
        prediction = model.predict(input_df)
        print(prediction)
        return str(np.round(prediction[0], 2))
    except Exception as e:
        print('Prediction error:', e)
        return 'Prediction failed', 400


if __name__ == '__main__':
    app.run(debug=True)