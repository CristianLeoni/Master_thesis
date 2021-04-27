from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.cluster import FeatureAgglomeration
import numpy as np
import pandas as pd

from my_util import filter_arguments,decode_parameters

class Pca:
    args = {
        'n_components' : 'float',
        'copy' : ['True','False'],
        'whiten' : ['True','False'],
        'svd_solver': ['auto', 'full', 'arpack'],
        'tol':'float',
        'iterated_power':'int',
        'random_state':'int'
        }
    args_default = {        
        'n_components':None,
        'copy':'True',
        'whiten':'False',
        'svd_solver':'auto',
        'tol':0.0,
        'iterated_power':'auto',
        'random_state':None
        }
    
    def get_reduced(df,hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,list(Pca.args.keys()))
        model = PCA(**hyperparameters)
        red = np.array(model.fit_transform(df))
        return pd.DataFrame(red[:,0:2],columns=['x','y'])    

    def get_parameters_default():
        return Pca.args_default
    
    def get_parameters_type():
        return Pca.args

class Tsne:
    args = {'perplexity':'float',
            'early_exaggeration':'float', 'learning_rate':'float', 
            'n_iter':'int', 'n_iter_without_progress':'int', 'min_grad_norm':'float', 
            'metric':'str', 'init':['random','pca'], 'verbose':'int', 'random_state':'int', 
            'method':'str', 'angle':'float', 'n_jobs':'int'
            #,'square_distances':['True','legacy']
        }
    args_default = {'n_components':2, 'perplexity':30.0, 
                    'early_exaggeration':12.0, 'learning_rate':200.0, 
                    'n_iter':1000, 'n_iter_without_progress':300, 'min_grad_norm':1e-07, 
                    'metric':'euclidean', 'init':'random', 'verbose':0, 'random_state':None, 
                    'method':'barnes_hut', 'angle':0.5, 'n_jobs':None, 'square_distances':'legacy'}
    
    def get_reduced(df,hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,list(Tsne.args.keys()))
        model = TSNE(**hyperparameters)
        red = np.array(model.fit_transform(df))
        return pd.DataFrame(red[:,0:2],columns=['x','y'])    

    def get_parameters_default():
        return Tsne.args_default
    
    def get_parameters_type():
        return Tsne.args
    
class Feature_agglomeration:
    args = {
            'n_clusters':'int',
            'affinity':'str',
            'memory':'str',
            'compute_full_tree':['True','False','auto'],
            'linkage':['ward','complete','average','single'],
            #'distance_threshold':'float',
            #'compute_distances':['True','False']
        }
    args_default = {
            'n_clusters':2,
            'affinity':'euclidean',
            'memory':None,
            'connectivity':None,
            'compute_full_tree':'auto',
            'linkage':'ward'
            #'distance_threshold':None,
            #'compute_distances':False
        }
    
    def get_reduced(df,hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,list(Feature_agglomeration.args.keys()))
        model = FeatureAgglomeration(**hyperparameters)
        red = np.array(model.fit_transform(df))
        return pd.DataFrame(red[:,0:2],columns=['x','y'])    

    def get_parameters_default():
        return Feature_agglomeration.args_default
    
    def get_parameters_type():
        return Feature_agglomeration.args

D_R = {
    'pca':Pca,
    'tsne':Tsne,
    'Feature_agglomeration':Feature_agglomeration,
}