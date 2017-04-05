import matplotlib.pyplot as plt
import random
from sklearn.cluster import KMeans
from scipy.spatial.distance import cdist,pdist
import numpy as np
from config import constants
from sklearn.decomposition import  PCA


def random_sample(values,num):

    return random.sample(values, int(num))

#Function to get values for plotting elbow
def plot_elbow(values):
    n = 10

    kMeansVar = [KMeans(n_clusters=k).fit(values) for k in range(1, n)]
    centroids = [X.cluster_centers_ for X in kMeansVar]
    k_euclid = [cdist(values, cent) for cent in centroids]
    dist = [np.min(ke, axis=1) for ke in k_euclid]
    wcss = [sum(d**2) for d in dist]

    return wcss
    # plt.plot(wcss)
    # plt.show()



def stratified_sample(values):

    k = 3
    kMeans = KMeans(n_clusters=k).fit(values)
    classified_values = {}

    for i in range(0,k):
        classified_values[i] = []

    for i,val in enumerate(values):
        classified_values[kMeans.labels_[i]].append(values[i])

    sampled_values = []
    for i in range(0,k):
         sampled_values.extend(random_sample(classified_values[i],constants.sample_fraction*len(classified_values[i])))



    return sampled_values


def find_pca(value):
    pca =  PCA(n_components = 2)
    return pca.fit_transform(value)
