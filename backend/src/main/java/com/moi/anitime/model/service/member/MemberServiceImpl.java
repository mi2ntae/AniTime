package com.moi.anitime.model.service.member;

import com.moi.anitime.api.request.member.GeneralMemberRegistReq;
import com.moi.anitime.api.request.member.MemberLoginReq;
import com.moi.anitime.exception.member.ExistEmailException;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {
	private final MemberRepo memberRepo;
	@Override
	public void registGeneralMember(GeneralMemberRegistReq memberRegistReq) throws ExistEmailException{
		if(memberRepo.findByEmail(memberRegistReq.getEmail()).isPresent()) throw new ExistEmailException();
		Member member = memberRegistReq.toEntity();
		memberRepo.save(member);
	}

	@Override
	public Member login(MemberLoginReq memberLoginReq) {
		Optional<Member> member = memberRepo.findByEmail(memberLoginReq.getEmail());
		return null;
	}

	@Override
	public Member findMemberById(int memberNo) {
		Optional<Member> member = memberRepo.findById(memberNo);
		return member.get();
	}
//	@Autowired
//	UserRepository userRepository;
//
//	@Autowired
//	UserRepositorySupport userRepositorySupport;
//
//	@Autowired
//	PasswordEncoder passwordEncoder;
//
//	@Override
//	public User createUser(UserRegisterPostReq userRegisterInfo) {
//		User user = new User();
//		user.setUserId(userRegisterInfo.getId());
//		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
//		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
//		return userRepository.save(user);
//	}
//
//	@Override
//	public User getUserByUserId(String userId) {
//		// 디비에 유저 정보 조회 (userId 를 통한 조회).
//		User user = userRepositorySupport.findUserByUserId(userId).get();
//		return user;
//	}
}
