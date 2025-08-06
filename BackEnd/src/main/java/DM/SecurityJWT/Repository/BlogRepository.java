package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.Blogs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blogs,Long> {
}
