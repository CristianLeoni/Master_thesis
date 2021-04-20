import sklearn
from sklearn import tree
from sklearn.svm import SVC
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import export_text
from sklearn.metrics import confusion_matrix
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB

from my_util import filter_arguments,decode_parameters

class Tree_classifier():
    args = {
        'criterion':['gini', 'entropy'],
        'splitter':['best', 'random'],
        'max_depth':'int',
        'min_samples_split': 'float',
        'min_samples_leaf':'float',
        'min_weight_fraction_leaf':'float',
        'max_features':'float',
        'random_state':'int',
        'max_leaf_nodes':'int',
        'min_impurity_decrease':'float',
        'min_impurity_split':'float',
        'ccp_alpha': 'non-negative float'
        }
    args_default = {'criterion':'gini', 'splitter':'best', 'max_depth':None, 'min_samples_split':2, 'min_samples_leaf':1,
                    'min_weight_fraction_leaf':0.0, 'max_features':None, 'random_state':None, 'max_leaf_nodes':None, 
                    'min_impurity_decrease':0.0, 'min_impurity_split':None, 'class_weight':None, 'ccp_alpha':0.0}
    
    def get_model(hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,Tree_classifier.args.values)
        hyperparameters['class_weight']='balanced'
        model = sklearn.tree.DecisionTreeClassifier(**hyperparameters)
        return model
    
    def get_parameters_default():
        return Tree_classifier.args_default
    
    def get_parameters_type():
        return Tree_classifier.args
        
class SVC_classifier():
    args = {
        'C':'float', 
        'kernel':['linear', 'poly', 'rbf', 'sigmoid', 'precomputed'], 
        'degree':'int', 
        'gamma':['scale','auto'], 
        'coef0':'float', 
        'shrinking':['True','False'], 
        #'probability':['True','False'], 
        'tol':'float', 
        'cache_size':'float', 
        'verbose':['True','False'], 
        'max_iter':'int', 
        'decision_function_shape':['ovr','ovo'], 
        'break_ties':['True','False'], 
        'random_state':'int'

        }
    args_default = {
        'C':1.0, 'kernel':'rbf', 'degree':3, 'gamma':'scale', 'coef0':0.0, 'shrinking':True, 'probability':False, 'tol':0.001, 
        'cache_size':200, 'class_weight':'balanced', 'verbose':False, 'max_iter':- 1, 'decision_function_shape':'ovr', 
        'break_ties':False, 'random_state':None        
    }
    
    def get_model(hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,SVC_classifier.args.values)
        hyperparameters['probability']=True
        model = make_pipeline(StandardScaler(), SVC(**hyperparameters))
        return model
    
    def get_parameters_default():
        return SVC_classifier.args_default
    
    def get_parameters_type():
        return SVC_classifier.args
    
class Knn_classifier():
    args = {
        'n_neighbors':'int', 
        'weights':['uniform','distance'], 
        'algorithm':['auto', 'ball_tree', 'kd_tree', 'brute'], 
        'leaf_size':'int', 
        'p':'int', 
        'metric':'str', 
        'n_jobs':'int'

        }
    args_default = {
        'n_neighbors':5, 'weights':'uniform', 'algorithm':'auto', 'leaf_size':30, 'p':2, 'metric':'minkowski', 
        'metric_params':None, 'n_jobs':None
        }
    
    def get_model(hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,Knn_classifier.args.values)
        model = sklearn.neighbors.KNeighborsClassifier(**hyperparameters)
        return model
    
    def get_parameters_default():
        return Knn_classifier.args_default
    
    def get_parameters_type():
        return Knn_classifier.args
    
class DecisionTree_classifier():
    args = {
        'criterion':['gini', 'entropy'],
        'splitter':['best','random'],
        'max_depth':'int',
        'min_samples_split':'float',
        'min_samples_leaf':'float',
        'min_weight_fraction_leaf':'float',
        'max_features':'float',
        'random_state':'int',
        'max_leaf_nodes':'int',
        'min_impurity_decrease':'float',
        'min_impurity_split':'float',
        #'class_weight':None,
        'ccp_alpha':'float'

        }
    args_default = {
        'criterion':'gini', 'splitter':'best', 'max_depth':None, 'min_samples_split':2, 'min_samples_leaf':1,
        'min_weight_fraction_leaf':0.0, 'max_features':None, 'random_state':None, 'max_leaf_nodes':None, 
        'min_impurity_decrease':0.0, 'min_impurity_split':None, 'class_weight':'balanced', 'ccp_alpha':0.0   
    }
    
    def get_model(hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,DecisionTree_classifier.args.values)
        model = DecisionTreeClassifier(**hyperparameters)
        hyperparameters['class_weight']='balanced'
        return model
    
    def get_parameters_default():
        return DecisionTree_classifier.args_default
    
    def get_parameters_type():
        return DecisionTree_classifier.args
    
class Naive_Bayes_classifier():
    args = {
        'var_smoothing':'float'
    }
    args_default = {
        'var_smoothing':1e-9
    }
    
    def get_model(hyperparameters={}):
        hyperparameters = filter_arguments(hyperparameters,Naive_Bayes_classifier.args.values)
        model = GaussianNB(**hyperparameters)
        return model
    
    def get_parameters_default():
        return Naive_Bayes_classifier.args_default
    
    def get_parameters_type():
        return Naive_Bayes_classifier.args

