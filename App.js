
const API_URL = 'http://172.16.11.15:3000/users';
const API_URL_PRODUCT = 'http://172.16.11.15:3000/prod';
 

const UserItem = ({ user, onDelete, onEdit }) => {
  return (
    <View style={styles.userItem}>
      <Text style={styles.usernome}>{user.nome}</Text>
      <Text style={styles.userAge}>{user.idade}</Text>
      <View style={styles.userActions}>
        <Button title="Editar" onPress={() => onEdit(user)} />
        <Button title="Excluir" onPress={() => onDelete(user.id)} />
      </View>
    </View>
  );
};
 

const UserForm = ({ user, onSave, onCancel }) => {
  const [nome, setnome] = useState(user ? user.nome : '');
  const [age, setAge] = useState(user ? user.idade : '');
 
  const handleSubmit = () => {
    if (user) {
     
      axios.put(`${API_URL}/${user.id}`, { nome: nome, idade: age })
        .then(() => onSave())
        .catch((error) => alert(error.message));
    } else {
      
      axios.post(API_URL, { nome: nome, idade: age })
        .then(() => onSave())
        .catch((error) => alert(error.message));
    }
  };
 
  return (
    <View style={styles.userForm}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setnome}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age.toString()}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <View style={styles.formActions}>
        <Button title="Salvar" onPress={handleSubmit} />
        <Button title="Cancelar" onPress={onCancel} />
      </View>
    </View>
  );
};
 

const prodItem = ({ prod, onDelete, onEdit }) => {
  return (
    <View style={styles.prodItem}>
      <Text style={styles.prodnome}>{prod.nome}</Text>
      <Text style={styles.prodpreco}>{prod.preco}</Text>
      <Text style={styles.prodDescription}>{prod.descricao}</Text>
      <View style={styles.userActions}>
        <Button title="Editar" onPress={() => onEdit(prod)} />
        <Button title="Excluir" onPress={() => onDelete(prod.id)} />
      </View>
    </View>
  );
};
 

const prodForm = ({ prod, onSave, onCancel }) => {
  const [nome, setnome] = useState(prod ? prod.nome : '');
  const [preco, setpreco] = useState(prod ? prod.preco : '');
  const [description, setDescription] = useState(prod ? prod.descricao : '');
 
  const handleSubmitp = () => {
    if (prod) {
      
      axios.put(`${API_URL_prod}/${prod.id}`, { nome: nome, preco: preco, descricao: description })
        .then(() => onSave())
        .catch((error) => alert(error.message));
    } else {
      
      axios.post(API_URL_prod, { nome: nome, preco: preco, descricao: description  })
        .then(() => onSave())
        .catch((error) => alert(error.message));
    }
  };
 
  return (
    <View style={styles.prodForm}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setnome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco.toString()}
        onChangeText={setpreco}
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.formActions}>
        <Button title="Salvar" onPress={handleSubmitp} />
        <Button title="Cancelar" onPress={onCancel} />
      </View>
    </View>
  );
};
 

const App = () => {
  const [users, setUsers] = useState([]);
  const [prods, setprods] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedprod, setSelectedprod] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFormP, setShowFormP] = useState(false);
 
  useEffect(() => {
    
    fetchUsers();
    fetchprods();
  }, []);
 
  const fetchUsers = () => {
    
    axios.get(API_URL)
      .then((response) => setUsers(response.data))
      .catch((error) => alert(error.message));
  };
 
  const handleDeleteUser = (id) => {
 
    Alert.alert(
      "Alerta de exclusão",
      "Deseja realmente excluir este usuário?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Exclusão cancelada"),
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            axios.delete(`${API_URL}/${id}`)
              .then(() => { fetchUsers();})
              .catch((error) => {
                Alert.alert("Erro", error.message);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };
 
  const handleEditUser = (user) => {
    
    setSelectedUser(user);
    setShowForm(true);
  };
 
  const handleSaveUser = () => {
    
    setShowForm(false);
    fetchUsers();
    setSelectedprod(null);
  };
 
  const handleCancelUser = () => {
        setShowForm(false);
    setSelectedUser(null);
  };
 
  const fetchprods = () => {
        
    axios.get(API_URL_prod)
      .then((response) => setprods(response.data))
      .catch((error) => alert(error.message));
  };
 
  const handleDeleteprod = (id) => {
 
    Alert.alert(
      "Alerta de exclusão",
      "Deseja realmente excluir este produto?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Exclusão cancelada"),
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            axios.delete(`${API_URL_prod}/${id}`)
              .then(() => { fetchprods();})
              .catch((error) => {
                Alert.alert("Erro", error.message);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };
 
  const handleEditprod = (prod) => {
    
    setSelectedprod(prod);
    setShowFormP(true);
  };
 
  const handleSaveprod = () => {
    
    setShowFormP(false);
    fetchprods();
    setSelectedUser(null);
  };
 
  const handleCancelprod = () => {
    
    setShowFormP(false);
    setSelectedprod(null);
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD API com React Native</Text>
      {showForm ? (
       
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCancelUser}
        />
      ) : (
        
        <>
           <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <UserItem
                user={item}
                onDelete={handleDeleteUser}
                onEdit={handleEditUser}
              />
            )}
          />
          <Button title="Adicionar usuário" onPress={() => setShowForm(true)} />          
        </>
      )}
      {showFormP ? (
        
        <prodForm
          prod={selectedprod}
          onSave={handleSaveprod}
          onCancel={handleCancelprod}
        />
      ) : (
        
        <>
           <FlatList
            data={prods}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <prodItem
                prod={item}
                onDelete={handleDeleteprod}
                onEdit={handleEditprod}
              />
            )}
          />
          <Button title="Adicionar produto" onPress={() => setShowFormP(true)} />          
        </>
      )}
    </View>
   
  );
 
};
 
export default App; //tive que colocar essa linha
 
 

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  usernome: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userAge: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
  userActions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  userForm: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#D06262',
    borderRadius: 10,
  },
  prodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  prodnome: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  prodpreco: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',

}}

);
