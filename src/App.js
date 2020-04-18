import React, {useEffect, useState}from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";


export default function App() {
  const [repositories, setrepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => {
     // console.log(response.data);
      setrepositories(response.data);
    })
  }, []);

 
  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`repositories/${id}/like`);
    const likeRepository = response.data;
    
    const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id){
       // repository.likes = likeRepository;
       
        return likeRepository;
      }else {
        return repository;
      }
    });
    console.log(repositoriesUpdated);
    setrepositories(repositoriesUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
    
      <SafeAreaView style={styles.container}>
        <FlatList
        
        data={repositories}
        keyExtractor={repository => repository.id} 
        renderItem={({ item: repository})=> (
          <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repository.title}</Text>
          
              <View style={styles.techsContainer}>
              
                  <Text key= {repository.id} style={styles.tech}>
                  {repository.techs}
                </Text>
               
             
              </View>
              <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes} curtida{repository.likes >1 ? 's' : ''}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>

          </View>
        )}
        
        />
        
       
      </SafeAreaView>
 
    
      {/*<SafeAreaView style={styles.container}>

        <View style={styles.repositoryContainer}>
       
      <Text style={styles.repository}key={repository.id}>Prueba</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
  </View>
      </SafeAreaView>*/}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
