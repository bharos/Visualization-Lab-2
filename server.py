
import pandas as pd


from flask import Flask
from flask import render_template
import json
import csv
from config import files
from config import constants
from sampling import random_sample
from sampling import plot_elbow
from sampling import stratified_sample
from sampling import find_pca
from sklearn.metrics import euclidean_distances
from sklearn import metrics as SK_Metrics
from sklearn.metrics import pairwise
import numpy as np
from sampling import find_pca
from sklearn.manifold import MDS
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/euclidean_template")
def euclidean_template():
    return render_template("euclidean.html")

@app.route("/correlation_template")
def correlation_template():
    return render_template("correlation.html")


@app.route("/data")
def get_data():
    # Code from the previous section: Data preparation

    row_list = []
    col_dict = {}
    with open(files.csv_file, 'rt') as f:
        reader = csv.reader(f)
        firstRow = next(reader)


        print(firstRow)

        for i,rowName in enumerate(firstRow):
            col_dict[rowName] = []

        for row in reader:
            row_list.append(row)
            for i,rowName in enumerate(firstRow):
                col_dict[rowName].append(row[i])


    # Perform random sampling
    print("LLLLLLLLL ",len(row_list))
    samples = random_sample(row_list, constants.sample_fraction*len(row_list))
    print("Random sampling - Num_sampled : "+str(len(samples)))
    # print(samples)

    #Find optimal k value with elbow
    # plot_elbow(row_list)
    #Perform stratified sampling


    samples = stratified_sample(row_list)
    print("Adaptive sampling - Num_sampled : "+str(len(samples)))


    #find PCA
    # pca_samples = find_pca(samples)
    # print(pca_samples)
    # print(euclidean_distances(pca_samples,pca_samples))


    dict = {}


    pca_values = find_pca(samples)
    euclidean_values = SK_Metrics.pairwise_distances(pca_values, metric = 'euclidean')
    corr_values = SK_Metrics.pairwise_distances(pca_values, metric = 'correlation')

    pca_values = np.array(pca_values,np.float32)

    # print(pca_values)
    pca_values = pca_values.tolist()

    dict['pca'] = pca_values

    mds = MDS(n_components=2, dissimilarity='precomputed')
    euclidean_values = mds.fit_transform(euclidean_values)

    corr_values = mds.fit_transform(corr_values)

    euclidean_values = np.array(euclidean_values,np.float32)
    euclidean_values = euclidean_values.tolist()

    corr_values = corr_values.tolist()

    dict['euclidean_vals'] = euclidean_values
    # dict['corr_vals'] = corr_values


    samples = np.array(samples,np.float32)
    res = samples.tolist()


    # print(dict['pca'])
    # dict['ab'] = [1,2,3,4,5]
    # samples = list(samples)
    # print(samples)
    # samples = samples.tolist()
    # dict['samples'] = res


    covariance_matrix =  np.corrcoef(samples,rowvar=False)
    eigen_vals,eigen_vector = np.linalg.eigh(covariance_matrix)

    eigen_vals = eigen_vals.tolist()
    dict['eigen_vals'] = eigen_vals

    print("sending data.....")
    return app.response_class(json.dumps(dict), content_type='application/json')


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
