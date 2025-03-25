package main.java.com.simpleapp.repository;

import com.simpleapp.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Spring Data JPA provides basic CRUD operations
}
